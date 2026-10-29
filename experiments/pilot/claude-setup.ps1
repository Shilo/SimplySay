[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[a-z0-9-]+$')]
    [string] $RunId,
    [string] $PolicyPath
)

# Historical pre-steering research setup; this script never launches a model.
# The current development agent must not invoke Claude through this file.
# Any later use belongs to a separately authorized owner-run experiment.
$ErrorActionPreference = 'Stop'
$taskClaudeRoot = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'Temp/SimplySay-pilot-20261028/claude'
$taskRunRoot = Join-Path $taskClaudeRoot $RunId
if (Test-Path -LiteralPath $taskRunRoot) {
    throw 'Choose a new RunId. Existing experimental evidence will not be overwritten.'
}
New-Item -ItemType Directory -Path $taskRunRoot -Force | Out-Null
$taskPolicy = if ($PolicyPath) {
    Get-Content -LiteralPath (Resolve-Path -LiteralPath $PolicyPath).Path -Raw
} else {
    'Inert packaging fixture. No communication policy or model task is authorized by this file.'
}
$taskRecords = [System.Collections.Generic.List[object]]::new()
$taskPreviousProfile = $env:CLAUDE_CONFIG_DIR
$taskPreviousTelemetry = $env:DISABLE_TELEMETRY
$taskPreviousErrors = $env:DISABLE_ERROR_REPORTING
$env:DISABLE_TELEMETRY = '1'
$env:DISABLE_ERROR_REPORTING = '1'

function Invoke-ClaudeControl {
    param([string[]] $ControlArguments)
    $taskNativeOutput = (& claude @ControlArguments 2>&1 | Out-String)
    $taskExit = $LASTEXITCODE
    $taskRecords.Add([ordered]@{
        arguments = $ControlArguments
        exitCode = $taskExit
        output = $taskNativeOutput
    })
    if ($taskExit -ne 0) {
        throw "Claude control failed (exit $taskExit). Inspect the local control log."
    }
    return $taskNativeOutput
}

function New-ClaudeFixturePackage {
    param([string] $Variant, [bool] $Forced)
    $taskCatalogRoot = Join-Path $taskRunRoot "catalog-$Variant"
    $taskPluginRoot = Join-Path $taskCatalogRoot 'plugin'
    New-Item -ItemType Directory -Force -Path (Join-Path $taskCatalogRoot '.claude-plugin'), (Join-Path $taskPluginRoot '.claude-plugin'), (Join-Path $taskPluginRoot 'output-styles') | Out-Null
    [ordered]@{
        name = 'simplysay-pilot-catalog'
        description = 'Disposable SimplySay feasibility research fixture'
        owner = @{ name = 'SimplySay research fixture' }
        plugins = @(@{ name = 'simplysay-pilot'; source = './plugin'; version = '0.0.0'; description = 'Disposable communication feasibility fixture' })
    } | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $taskCatalogRoot '.claude-plugin/marketplace.json') -Encoding utf8
    [ordered]@{
        name = 'simplysay-pilot'
        version = '0.0.0'
        description = 'Disposable communication feasibility fixture'
        author = @{ name = 'SimplySay research fixture' }
    } | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $taskPluginRoot '.claude-plugin/plugin.json') -Encoding utf8
    $taskStyleHeader = @(
        '---'
        'name: SimplySay pilot'
        'description: Disposable research style'
        'keep-coding-instructions: true'
    )
    if ($Forced) { $taskStyleHeader += 'force-for-plugin: true' }
    $taskStyleHeader += '---'
    (($taskStyleHeader -join "`n") + "`n" + $taskPolicy + "`n") | Set-Content -LiteralPath (Join-Path $taskPluginRoot 'output-styles/simplysay-pilot.md') -Encoding utf8
    @'
# Disposable research fixture

This local package exists only to investigate native Claude plugin installation and response-style controls in a synthetic temporary environment. It is not a SimplySay production release, must not be published, and contains no hooks, network connections, executable runtime code, agents, or telemetry. Model evaluations require separate approval and a centrally reserved session allocation.
'@ | Set-Content -LiteralPath (Join-Path $taskPluginRoot 'README.md') -Encoding utf8
    return $taskCatalogRoot
}

try {
    $taskForcedCatalog = New-ClaudeFixturePackage -Variant forced -Forced $true
    $taskSelectedCatalog = New-ClaudeFixturePackage -Variant selected -Forced $false
    $taskSummary = [ordered]@{ runId = $RunId; inert = -not [bool]$PolicyPath; modelSessionAttempts = 0; states = @() }
    foreach ($taskState in @('absent', 'disabled', 'forced', 'selected', 'native-concise', 'minimal')) {
        $taskProfile = Join-Path $taskRunRoot "profiles/$taskState"
        New-Item -ItemType Directory -Force -Path $taskProfile | Out-Null
        $env:CLAUDE_CONFIG_DIR = $taskProfile
        $taskSettings = [ordered]@{ spinnerTipsEnabled = $false }
        if ($taskState -eq 'selected') { $taskSettings.outputStyle = 'SimplySay pilot' }
        if ($taskState -eq 'native-concise') { $taskSettings.outputStyle = 'Concise' }
        $taskSettings | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $taskProfile 'settings.json') -Encoding utf8
        if ($taskState -in @('disabled', 'forced', 'selected')) {
            $taskCatalog = if ($taskState -eq 'selected') { $taskSelectedCatalog } else { $taskForcedCatalog }
            $null = Invoke-ClaudeControl @('plugin', 'validate', '--strict', '--json', $taskCatalog)
            $null = Invoke-ClaudeControl @('plugin', 'validate', '--strict', '--json', (Join-Path $taskCatalog 'plugin'))
            $null = Invoke-ClaudeControl @('plugin', 'marketplace', 'add', '--json', $taskCatalog)
            $null = Invoke-ClaudeControl @('plugin', 'install', '--json', 'simplysay-pilot@simplysay-pilot-catalog')
            if ($taskState -eq 'disabled') {
                $null = Invoke-ClaudeControl @('plugin', 'disable', 'simplysay-pilot@simplysay-pilot-catalog')
            }
        }
        $taskInventory = (Invoke-ClaudeControl @('plugin', 'list', '--json')) | ConvertFrom-Json
        $taskSummary.states += [ordered]@{
            state = $taskState
            inventory = @($taskInventory | Select-Object id, version, enabled)
            configuredOutputStyle = $taskSettings.outputStyle
            loadedPolicyObserved = $false
            profile = $taskProfile
        }
    }
    $taskSummary.packages = @(
        Get-ChildItem -LiteralPath $taskForcedCatalog, $taskSelectedCatalog -Recurse -File |
            ForEach-Object {
                [ordered]@{ path = $_.FullName; bytes = $_.Length; sha256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash }
            }
    )
    $taskSummary | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath (Join-Path $taskRunRoot 'setup-summary.json') -Encoding utf8
    $taskSummary | ConvertTo-Json -Depth 12
} finally {
    $taskRecords | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $taskRunRoot 'control-log.json') -Encoding utf8
    $env:CLAUDE_CONFIG_DIR = $taskPreviousProfile
    $env:DISABLE_TELEMETRY = $taskPreviousTelemetry
    $env:DISABLE_ERROR_REPORTING = $taskPreviousErrors
}

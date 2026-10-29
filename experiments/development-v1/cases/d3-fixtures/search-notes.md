# Search freshness notes

A title edit writes synchronously to the primary store: when the edit succeeds, that store has the new title. Search does not read that store directly. A background job updates the separate search index asynchronously. Nobody has confirmed a maximum index-update delay.

Search results are cached per query for 90 seconds. A cache hit returns its saved result. A cache miss reads the search index and caches that result for the next 90 seconds, even if the index still has the old title. Clearing or expiring the cache does not itself run the index job. No supported force-refresh endpoint or verified index-status screen is supplied here.

One observed local trace: at 14:00:00 an edit changed the primary title from Aspen to Birch; the index still held Aspen. At 14:00:05 a cache miss read Aspen from the old index and cached it until 14:01:35. In this trace the index job completed at 14:00:35, but a 14:00:50 search still returned the cached Aspen. At 14:01:35 the first request after expiry read Birch from the now-updated index. That observed 35-second index delay is not an SLA or a confirmed maximum.

Tomorrow's demo can use entries that were indexed before the session and verified in the actual search view. It does not have to demonstrate a just-edited title appearing in search. No live service is connected to this local planning exercise.

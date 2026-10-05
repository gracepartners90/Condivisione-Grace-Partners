# Memoria seo-content (ITnode)

## Limiti dell'ambiente (verificati il 2026-09-28 e il 2026-10-05)
- WebSearch funziona ma usa un indice USA: le query italiane danno risultati italiani, quelle ambigue («tour 360°») danno risultati internazionali. Nessun PAA e nessun volume.
- Bloccati: `suggestqueries.google.com` (403 del proxy, non riprovare), WebFetch su consiglio.puglia.it, bariexperience.com, varesenews.it e leccesette.it, oltre a itnode.it, ai portali *digitale.it/.com, a railway.app e a LinkedIn. Usa solo gli estratti di WebSearch e marca [DA VERIFICARE].
- Il portale cittàdigitali.it è bloccato dalla policy: niente WebFetch, copie in cache o archivi. Anche rdap.nic.it è bloccato (403): la registrazione dei domini .it non si verifica da qui.

## Evidenze SERP da ricordare (dettagli e URL in docs/seo/ricerca-keyword.md)
- «Puglia Digitale» ha tre entità: l'agenda digitale della Regione (dominante), il portale puglia-digitale.it (Campo e controcampo + Consiglio regionale) e quello di ITnode (lapugliadigitale.it). Disambiguare sempre.
- «Città Digitali» (ricerca di marca del 2026-10-05, ricerca-keyword §2.1 e review omonimia):
  - un solo portale del cliente, cittàdigitali.it (`xn--cittdigitali-19a.it`), confermato dall'utente il 2026-10-05;
  - cittadigitali.it senza accento è «CITTA' DIGITALI», un progetto di altri (Biella, Lecce, Salerno, Trento, Treviso), e non si risolve;
  - omonimi: «Le Città Digitali» (iComm Lab, Leadstone; stesso fondatore: l'indice attribuisce l'idea a iComm Lab), «Città Digitale» (cittadigitale.it), significato generico (Treccani, ICity Rank);
  - il motore ignora gli accenti nelle query, non nei domini.
- «ITnode» ha omonimi esteri (Australia, India); grafie incoerenti sul Web. «Giacomo Lenoci» ha molti omonimi.
- «SIII» e «sito interattivo immersivo» sono senza domanda consolidata; la domanda sta su tour virtuale, virtual tour e tour 360°, dove il mercato è basato sul prezzo (fotografi Google Street View, Matterport).

## Lezioni di metodo
- Title e meta: contare sempre con uno script (apostrofo tipografico = 1 carattere) e verificare l'unicità. `check:seo` accetta meta tra 110 e 160 caratteri, title fino a 60.
- Title e meta sono una mia decisione: la mappa §2 è la fonte di `src/data/pages.ts`. Se cambio una meta, la scrivo nella mappa e la sessione principale la applica; il copy deck ne ha una copia da aggiornare.
- Blocchi AEO: solo fatti delle linee guida. Se un fatto serve ma non c'è (per es. la definizione generale di tour 360°), marcarlo come [DA VERIFICARE con ITnode].
- Il brief consolidato (docs/brief/brief-consolidato.md) è arrivato mentre lavoravo. Controllarlo sempre prima di scrivere testi pubblicabili: il registro dei claim (codici A/N/F/S) e le decisioni DR1–DR5 cambiano le formulazioni. Esempio: per Puglia Digitale niente «ha creato» (A1, DR4); le foto del fondatore sono forse AI (DR3). Mappa e ricerca sono allineate dalla versione 0.2.
- Nei documenti SEO si citano i codici del brief invece di ripetere le domande al cliente: si evitano duplicati e divergenze.
- Un dominio che in SERP ha titolo o contenuti diversi da quelli del cliente è un omonimo, finché il cliente non dice il contrario. Il 2026-09-28 ho letto cittadigitali.it come «secondo dominio» di Città Digitali: era sbagliato, corretto il 2026-10-05.
- Anche le linee guida possono contenere un dato sbagliato (il dominio di §22). I domini delle linee guida vanno confrontati con l'indice e confermati dal cliente.
- seo-technical e brand-strategist lavorano spesso in parallelo sugli stessi temi. Prima di proporre controlli o correzioni, guardare `git log` e i loro documenti: per esempio `check:seo` blocca già il dominio omonimo (commit d419d0d).

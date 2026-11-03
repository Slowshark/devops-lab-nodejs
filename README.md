# DevOps Lab – Projet étudiant (Node.js + Jira/GitHub + CI/CD)

![CI](https://github.com/Slowshark/devops-lab-nodejs/actions/workflows/ci.yml/badge.svg)

Ce dépôt est le **projet du TD 3** du cours DevOps & Software Engineering (ESILV, 2026/2027).
Il reproduit un workflow DevOps réaliste : **PLAN (Jira) → CODE (Git/VS Code) → BUILD/TEST (GitHub Actions) → REVIEW (PR) → DEPLOY (optionnel)**.

> **Contenu du projet**
> - API **Express** minimale avec des routes montées automatiquement
> - **Vitest + Supertest** pour les tests d'intégration et unitaires
> - Seuils de couverture imposés par la CI
> - Workflow **GitHub Actions** : lint + tests + artefact de couverture
> - Organisation des fichiers claire pour une équipe de 4

---

## Équipe et répartition

| Étudiant | Membre | Story Jira | Fichier |
|---|---|---|---|
| A | ung Yvanthivong | DEVOPS-1 – endpoint `/version` | `src/routes/auto/version.route.js` |
| B | Wang Félix | DEVOPS-2 – endpoint `/info` | `src/routes/auto/info.route.js` |
| C | KELES Kerem | DEVOPS-3 – endpoint `/boom` | `src/routes/auto/boom.route.js` |
| D | ung Yvanthivong | DEVOPS-4 – utilitaire `formatStatus()` | `src/utils/status.js` |

Suivi du projet : Jira, projet **DevOps Lab Node.js Project** (clé `DEVOPS`).

---

## Démarrage rapide

```bash
npm ci
npm run dev          # http://localhost:3000
npm test -- --coverage
```

Ouvrez `coverage/index.html` pour voir le rapport de couverture en local.

> Sous Windows, évitez les caractères spéciaux comme `&` dans le chemin du dossier : ils empêchent les scripts `npm run …` de fonctionner.

---

## Routes

- `GET /` – message d'accueil en JSON
- `GET /health` – vérification de l'état du service (200 OK)
- `GET /version` – retourne `{ version }` lu dans `package.json`
- `GET /info` – retourne `{ name, version, node, uptime }`
- `GET /boom` – déclenche une erreur pour tester le gestionnaire d'erreurs global

Les routes sont **montées automatiquement** depuis `src/routes/auto/*.route.js` : chaque étudiant peut ajouter son fichier sans modifier `src/app.js` (moins de conflits de fusion).

---

## Tests

- **Tests d'intégration** (Supertest) : ils appellent les endpoints HTTP, dans `test/*.test.js`.
- **Tests unitaires** : ils testent la logique interne, dans `test/unit/*.test.js`.

Seuils de couverture : lignes / fonctions / instructions ≥ 80 %, branches ≥ 70 % (définis dans `vitest.config.js`).
Si la couverture passe sous ces seuils, la CI échoue et bloque la fusion (quality gate).

---

## Conventions de branches et de commits (liées à Jira)

- Branche : `feature/<CLÉ-TICKET>-<description-courte>` → ex. `feature/DEVOPS-1-version-endpoint`
- Commit : `feat(<CLÉ-TICKET>): <quoi>` → ex. `feat(DEVOPS-1): read package.json once for /version endpoint`
- Titre de PR : `<CLÉ-TICKET> | <titre>` → ex. `DEVOPS-1 | Implement /version endpoint`

Grâce à l'application **GitHub for Atlassian**, les branches, commits, PR et builds qui contiennent la clé du ticket apparaissent automatiquement dans le panneau *Development* du ticket Jira.

Règle d'équipe : chaque PR est relue par un autre membre et n'est fusionnée que si la CI est verte.

---

## CI (GitHub Actions)

Le workflow `.github/workflows/ci.yml` s'exécute à chaque push et à chaque PR vers `main` :

- Installation de Node et des dépendances (`npm ci`)
- `npm run lint`
- `npm test -- --coverage`
- Dépôt du dossier `coverage/` comme artefact téléchargeable

---

## Organisation du projet

```
src/
  app.js          # application Express (montage auto + gestionnaire d'erreurs global)
  index.js        # point d'entrée du serveur (non utilisé par les tests)
  routes/auto/    # les étudiants ajoutent ici leurs fichiers *.route.js
  utils/          # petites fonctions utilitaires testables
test/
  *.test.js       # tests d'intégration (HTTP)
  unit/*.test.js  # tests unitaires
```

---

## Scripts utiles

- `npm run dev` – lance le serveur de développement avec nodemon
- `npm test` – exécute tous les tests (Vitest)
- `npm test -- --coverage` – idem, avec la couverture
- `npm run lint` – vérification ESLint

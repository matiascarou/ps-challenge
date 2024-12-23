## Deployments
  - Frontend => https://matiascarou.github.io/ps-challenge/
  - Backend => https://ps-challenge-backend.vercel.app/
    - **NOTE**: This is deployed in `vercel` and under a free plan, so endpoints tend to get a lot of timeouts
      - For properly testing use the frontend deployment URL + spinup backend locally as instructed below

## Testing
- Local
  - Clone the repo
  - Paste the `.env` file sent personally in the root of the `backend` folder
  - In the root directory (`ps-challenge`), run `yarn` or `yarn setup`
    - yarn start:dev
      - Will spinup both frontend and backend
    - yarn start:frontend
      - Will spinup only frontend
    - yarn start:backend:dev
      - Will spinup only backend (non-vercel testing)
     
## [DEMO](https://scale.zoom.us/clips/share/A2F3MRZFa1Z4bld6S1RFS0pqY0VGNURmZnhRAQ)

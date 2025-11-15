# vcr-react-express-monorepo-template

## Debug or Deploy VCR App

The ReactJS `/frontend` folder and ExpressJS `/backend` folder should be run separately. They each have their own `vcr.yml` file that needs to be configured.

You should run `vcr init` in both folders. This will allow you to create Vonage Applications and help generate Application IDs that generate `vcr.yml` files. You can then use the examples as reference: `vcr-frontend-sample.yml` and `vcr-backend-sample.yml`.

To run Locally (vcr debug):

1. Run the Backend: In another terminal, `cd backend` and `vcr debug -y`
2. Run the Frontend: In terminal, `cd frontend` and `npm start`

To deploy (vcr deploy):

1. Deploy the Backend: `cd backend` and then `vcr deploy`

2. Deploy the Frontend:
   1. Update in /frontend/src/App.js `BACKEND_URL` to your VCR Backend URL.
   2. Update in /backend/vcr.yml `FRONTEND_URL` to your VCR Frontend URL. You can deploy frontend twice to retrieve it. There's probably a smarter way to do this.
   3. Then `cd frontend` and `vcr deploy`

## Work History

1. Requires 2 VCR application ID's first for frontend and second for backend.
2. Created two directories: `backend` and `frontend`.
3. In the `frontend` directory:
   - Ran `npx create-react-app .` to create a new ReactJS project in the empty directory.
   - Ran `vcr init` and created a new app named `vcr-react-frontend`.
4. In the `backend` directory:
   - Ran `vcr init` and created a new app named `vcr-react-backend`.
   - Chose "Starter App" as the VCR application template.

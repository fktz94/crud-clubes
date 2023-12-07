import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import NewTeam from './pages/NewTeam';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<Team />} />
        <Route path="/new-team" element={<NewTeam />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

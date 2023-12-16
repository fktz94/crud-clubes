import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Container className="flex flex-col grow bg-zinc-800 text-zinc-100">
        <div className="w-4/5 m-auto my-4">
          <Outlet />
        </div>
      </Container>
    </div>
  );
}

export default Layout;

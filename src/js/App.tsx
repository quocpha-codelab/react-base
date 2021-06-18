import { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ConfigProvider } from 'antd';

import '../scss/App.scss';

import { validateMessages } from './config/validate';

import PrivateRoute from './PrivateRoute';
import MainLayout from './components/layout/MainLayout';

const SignIn = lazy(() => import('./pages/auth/SignIn'));

const Home = lazy(() => import('./pages/home'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const ROUTE = (
  <BrowserRouter>
    <div>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/sign-in" component={SignIn} />

          <PrivateRoute exact path="/" component={Home} layout={MainLayout} />
        </Switch>
      </Suspense>
    </div>
  </BrowserRouter>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider form={{ validateMessages }}>
        {ROUTE}

        <ReactQueryDevtools />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;

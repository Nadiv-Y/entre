import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import NewOperationPage from './pages/NewOperationPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account/:accountNumber" element={<AccountPage />} />
          <Route path="/new-operation" element={<NewOperationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

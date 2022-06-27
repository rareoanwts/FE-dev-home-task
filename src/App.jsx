import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserProfile, RepositoriesPage, IssuesPage, CommentsPage } from './features';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:userId" element={<UserProfile />} />
        <Route path="/:userId/repositories" element={<RepositoriesPage />} />
        <Route path="/:userId/:repo/issues" element={<IssuesPage />} />
        <Route path="/:userId/:repo/issues/:issueNumber" element={<CommentsPage />} />
      </Routes>
    </Router>
  );
};
export default App;

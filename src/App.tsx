/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : App
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { META } from '@containers/meta';
import Helmet from '@components/common/Helmet';
import Main from '@components/main';

export default function App() {
  const meta = {
    title: META.MAIN.title,
    description: META.MAIN.description,
    keyword: META.MAIN.keyword,
  };

  return (
    <Router>
      <Helmet title={meta.title} description={meta.description} keywords={meta.keyword} />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </Router>
  );
}

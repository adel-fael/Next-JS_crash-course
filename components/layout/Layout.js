import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import Meta from './Meta';

function Layout({children}) {
  return (
    <div>
      <Meta/>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default Layout;

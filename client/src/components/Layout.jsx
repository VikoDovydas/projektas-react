import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

import { Provider } from "./providers";
import MainRoutes from "./routes/routes";

function App() {
  return (
    <>
      <Provider>
        <MainRoutes />
      </Provider>
    </>
  );
}

export default App;

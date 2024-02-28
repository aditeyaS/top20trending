import Footer from "../components/Footer";
import Header from "../components/Header";
import Toast from "../components/Toast";
import {
  hideToast,
  selectIsLoading,
  selectSelectedTab,
  selectShowToast,
  selectToastData,
} from "../redux/slice/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Movies from "./Movies";
import Music from "./Music";
import TVPage from "./TVPage";
import Loader from "../components/Loader";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const showToast = useAppSelector(selectShowToast);
  const toastData = useAppSelector(selectToastData);
  const isLoading = useAppSelector(selectIsLoading);
  const selectedTab = useAppSelector(selectSelectedTab);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="bg-base-100 text-base-content container mx-auto py-10 px-6 flex-1 flex flex-col">
            <div className="w-fit py-5 px-10 flex flex-wrap flex-1 gap-5 justify-center">
              {selectedTab === "Movies" && <Movies />}
              {selectedTab === "TV" && <TVPage />}
              {selectedTab === "Music" && <Music />}
            </div>
          </div>
          {showToast && toastData && (
            <Toast
              toastData={toastData}
              onClose={() => dispatch(hideToast())}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Dashboard;

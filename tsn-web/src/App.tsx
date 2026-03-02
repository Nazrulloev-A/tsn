// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Footer from "./components/Footer";

// // ✅ NEW PAGE
// import JobPlacementDrivenModel from "./pages/JobPlacementDrivenModel";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/job-placement-driven-model" element={<JobPlacementDrivenModel />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";

// ✅ service detail pages (create files below)
import JobPlacementDrivenModel from "./pages/JobPlacementDrivenModel";
import FlexibleSelfPacedLearning from "./pages/FlexibleSelfPacedLearning";
import CareerAdvancementPath from "./pages/CareerAdvancementPath";

import { Routes, Route } from "react-router-dom";
import PageTransition from "./components/PageTransition";

function App() {
  return (
    <>
      <Navbar />

      <main className="pt-[96px]">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ✅ service detail routes */}
            <Route
              path="/job-placement-driven-model"
              element={<JobPlacementDrivenModel />}
            />
            <Route
              path="/flexible-self-paced-learning"
              element={<FlexibleSelfPacedLearning />}
            />
            <Route
              path="/career-advancement-path"
              element={<CareerAdvancementPath />}
            />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
    </>
  );
}

export default App;
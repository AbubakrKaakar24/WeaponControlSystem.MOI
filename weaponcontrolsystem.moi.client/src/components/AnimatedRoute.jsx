import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './auth/Login';
import Home from './Home';
import OfficerAdd from './OfficerAdd';
import RegisterUser from './auth/RegisterUser';
import WeaponAdd from './WeaponAdd';

const pageAnimation = {
    initial: { x: '100vw', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100vw', opacity: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' }};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageAnimation}>
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div {...pageAnimation}>
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/home"
          element={
            <motion.div {...pageAnimation}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/officer"
          element={
            <motion.div {...pageAnimation}>
              <OfficerAdd />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div {...pageAnimation}>
              <RegisterUser />
            </motion.div>
          }
        />
        <Route
          path="/weapon"
          element={
            <motion.div {...pageAnimation}>
              <WeaponAdd />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

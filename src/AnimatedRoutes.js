import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { About, Projects, NavBar, Experience, Education, Awards, Skills } from './components';

/**
 * AnimatedRoute component wraps a given component with animation effects.
 * 
 * @param {Object} props - Props passed to the component.
 * @param {React.ComponentType} props.component - The component to be animated.
 * @returns {JSX.Element} The animated component.
 */
const AnimatedRoute = ({ component: Component }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start with an opacity of 0 (invisible)
      animate={{ opacity: 1 }} // Animate to an opacity of 1 (fully visible)
      exit={{ opacity: 0 }} // Animate out to opacity 0 (invisible again)
      transition={{ duration: 0.5 }} // Duration of the animation in seconds
    >
      <Component />
    </motion.div>
  );
};

/**
 * AnimatedRoutes component defines the routes for the application
 * with animation transitions for each route.
 * 
 * @returns {JSX.Element} The animated routes.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute component={About} />} />
        <Route path="/about" element={<AnimatedRoute component={About} />} />
        <Route path="/experience" element={<AnimatedRoute component={Experience} />} />
        <Route path="/education" element={<AnimatedRoute component={Education} />} />
        <Route path="/projects" element={<AnimatedRoute component={Projects} />} />
        <Route path="/skills" element={<AnimatedRoute component={Skills} />} />
        <Route path="/awards" element={<AnimatedRoute component={Awards} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

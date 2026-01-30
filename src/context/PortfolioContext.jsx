import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPortfolioData } from '../services/api';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState({
    about: null,
    projects: [],
    skills: [],
    experiences: [],
    testimonials: [],
    socials: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioData = await getPortfolioData();
        setData(portfolioData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ ...data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password });
  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('userInfo');
};

export const getProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await api.post('/projects', projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await api.put(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

// Upload image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Experience API functions
export const getExperience = async () => {
  const { data } = await api.get('/experience');
  return data;
};

export const createExperience = async (experienceData) => {
  const { data } = await api.post('/experience', experienceData);
  return data;
};

export const updateExperience = async (id, experienceData) => {
  const { data } = await api.put(`/experience/${id}`, experienceData);
  return data;
};

export const deleteExperience = async (id) => {
  const { data } = await api.delete(`/experience/${id}`);
  return data;
};

export const getEducation = async () => {
  const { data } = await api.get('/education');
  return data;
};

export const createEducation = async (educationData) => {
  const { data } = await api.post('/education', educationData);
  return data;
};

export const updateEducation = async (id, educationData) => {
  const { data } = await api.put(`/education/${id}`, educationData);
  return data;
};

export const deleteEducation = async (id) => {
  const { data } = await api.delete(`/education/${id}`);
  return data;
};

export const getAchievements = async () => {
  const { data } = await api.get('/achievements');
  return data;
};

export const createAchievement = async (achievementData) => {
  const { data } = await api.post('/achievements', achievementData);
  return data;
};

export const updateAchievement = async (id, achievementData) => {
  const { data } = await api.put(`/achievements/${id}`, achievementData);
  return data;
};

export const deleteAchievement = async (id) => {
  const { data } = await api.delete(`/achievements/${id}`);
  return data;
};

// Resume API functions
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const { data } = await api.post('/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getResume = async () => {
  const { data } = await api.get('/resume');
  return data;
};

export const getReviews = async () => {
  const { data } = await api.get('/reviews');
  return data;
};

export default api;

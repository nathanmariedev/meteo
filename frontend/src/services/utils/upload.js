const upload = {};

const progressEvents = {};
const progressValues = {};

// Obtenir la valeur générale de progression de l'upload à partir des events axios, filekey est obligatoire si plusieurs fichiers
const getProgress = (axiosProgressEvent, fileKey = 'file1', progressKey = 'progress1') => {
  if (!progressEvents[progressKey]) progressEvents[progressKey] = {};

  progressEvents[progressKey][fileKey] = axiosProgressEvent;

  // On calcule le pourcentage de la progression asynchrone des envois des fichiers
  const currentProgressUpload = Object.values(progressEvents[progressKey]).reduce((acc, event) => acc + event.loaded, 0);
  const totalProgressUpload = Object.values(progressEvents[progressKey]).reduce((acc, event) => acc + event.total, 0);
  progressValues[progressKey] = Math.round((currentProgressUpload / totalProgressUpload) * 100);

  return progressValues[progressKey];
};

upload.getProgress = getProgress;

export default upload;

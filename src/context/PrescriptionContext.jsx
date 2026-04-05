import React, { createContext, useContext, useState, useEffect } from 'react';

const PrescriptionContext = createContext();

export const PrescriptionProvider = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [uploadedPrescriptions, setUploadedPrescriptions] = useState([]);

  useEffect(() => {
    const savedPrescriptions = localStorage.getItem('simple_healthcare_prescriptions');
    if (savedPrescriptions) setPrescriptions(JSON.parse(savedPrescriptions));
    
    const savedUploads = localStorage.getItem('simple_healthcare_uploads');
    if (savedUploads) setUploadedPrescriptions(JSON.parse(savedUploads));
  }, []);

  const savePrescription = (prescriptionData) => {
    const newPrescription = {
      id: prescriptionData.id,
      patient: prescriptionData.patient,
      doctor: prescriptionData.doctor,
      diagnosis: prescriptionData.diagnosis,
      medications: prescriptionData.medications,
      date: new Date().toISOString(),
      status: 'active',
      sentToPharmacy: null
    };

    const updatedPrescriptions = [...prescriptions, newPrescription];
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem('simple_healthcare_prescriptions', JSON.stringify(updatedPrescriptions));
    return newPrescription;
  };

  const getPatientPrescriptions = (patientName) => {
    return prescriptions.filter(rx => rx.patient.toLowerCase() === patientName.toLowerCase());
  };

  const sendToPharmacy = (prescriptionId, pharmacyName) => {
    const updatedPrescriptions = prescriptions.map(rx =>
      rx.id === prescriptionId
        ? { ...rx, sentToPharmacy: pharmacyName, status: 'sent_to_pharmacy' }
        : rx
    );
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem('simple_healthcare_prescriptions', JSON.stringify(updatedPrescriptions));
  };

  const uploadPrescriptionImage = (imageData) => {
    const newUpload = {
      id: `UP-${Date.now()}`,
      image: imageData.url,
      name: imageData.name || 'Manual Prescription Upload',
      date: new Date().toISOString(),
      patient: imageData.patient,
      status: 'private'
    };
    const updatedUploads = [...uploadedPrescriptions, newUpload];
    setUploadedPrescriptions(updatedUploads);
    localStorage.setItem('simple_healthcare_uploads', JSON.stringify(updatedUploads));
    return newUpload;
  };

  const forwardToStore = (prescriptionId, storeId, isImage = false) => {
    if (isImage) {
      const updatedUploads = uploadedPrescriptions.map(up => 
        up.id === prescriptionId ? { ...up, forwardedTo: storeId, status: 'forwarded' } : up
      );
      setUploadedPrescriptions(updatedUploads);
      localStorage.setItem('simple_healthcare_uploads', JSON.stringify(updatedUploads));
    } else {
      sendToPharmacy(prescriptionId, storeId);
    }
  };

  const downloadPrescription = (prescriptionId) => {
    // In a real app, this would generate a PDF
    // For now, we'll simulate download
    const prescription = prescriptions.find(rx => rx.id === prescriptionId);
    if (prescription) {
      const dataStr = JSON.stringify(prescription, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

      const exportFileDefaultName = `prescription-${prescriptionId}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  return (
    <PrescriptionContext.Provider value={{
      prescriptions,
      savePrescription,
      getPatientPrescriptions,
      sendToPharmacy,
      downloadPrescription,
      uploadedPrescriptions,
      uploadPrescriptionImage,
      forwardToStore
    }}>
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescriptions = () => {
  const context = useContext(PrescriptionContext);
  if (!context) {
    throw new Error('usePrescriptions must be used within a PrescriptionProvider');
  }
  return context;
};
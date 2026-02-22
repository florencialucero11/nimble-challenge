import { useState } from 'react';
import { apiService } from '../services/api';

const JobItem = ({ job, candidate }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('loading');
  
  try {
     
    const payload = {
      applicationId: candidate.applicationId,
      uuid: candidate.uuid,
      candidateId: String(candidate.candidateId),
      jobId: String(job.id),
      repoUrl: repoUrl
    };
        
    const res = await apiService.applyToJob(payload);
    
    if (res.ok) {
      setStatus('success'); // Muestra un mensaje verde de éxito
    }
  } catch (err) {
    setStatus('error');
    // Tip: La API de Nimble suele dar pistas en el error
    console.error("Detalle del error:", err);
  }
};
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
      <h3>{job.title}</h3>
      {status === 'success' ? (
        <p style={{ color: 'green' }}>✅ ¡Postulación enviada con éxito!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="URL del Repositorio GitHub"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
            style={{ width: '70%', padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" disabled={status === 'loading'} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            {status === 'loading' ? 'Enviando...' : 'Submit'}
          </button>
          {status === 'error' && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errorMsg}</p>}
        </form>
      )}
    </div>
  );
};

export default JobItem;
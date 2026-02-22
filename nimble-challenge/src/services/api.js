const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api';

export const apiService = {
  // Step 2: Obtener datos del candidato
  getCandidate: async (email) => {
    const response = await fetch(`${BASE_URL}/candidate/get-by-email?email=${email}`);
    if (!response.ok) throw new Error('Error al obtener datos del candidato');
    return response.json();
  },

  // Step 3: Obtener lista de trabajos
  getJobs: async () => {
    const response = await fetch(`${BASE_URL}/jobs/get-list`);
    if (!response.ok) throw new Error('Error al obtener la lista de trabajos');
    return response.json();
  },

  // Step 5: Enviar postulación
  applyToJob: async (payload) => {
    const response = await fetch(`${BASE_URL}/candidate/apply-to-job`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Error al postular');
    return result;
  }
};
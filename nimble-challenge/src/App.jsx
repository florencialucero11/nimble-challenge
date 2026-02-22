import { useState, useEffect } from "react";
import { apiService } from "./services/api";
import JobItem from "./components/JobItem";

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MY_EMAIL = "florenciadevamatias@gmail.com";

  useEffect(() => {
    const initData = async () => {
      try {
        const [candidateData, jobsData] = await Promise.all([
          apiService.getCandidate(MY_EMAIL),
          apiService.getJobs(),
        ]);

        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        setError("Error al cargar los datos iniciales.");
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  if (loading)
    return (
      <div style={styles.centerScreen}>
        <div style={styles.loader}></div>
        <p style={{ marginTop: "20px" }}>Cargando posiciones...</p>
      </div>
    );

  if (error)
    return (
      <div style={styles.centerScreen}>
        <p style={{ color: "#ef4444", fontSize: "18px" }}>{error}</p>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Nimble Gravity Jobs</h1>
          {candidate && (
            <p style={styles.subtitle}>
              Candidato:{" "}
              <strong>
                {candidate.firstName} {candidate.lastName}
              </strong>
            </p>
          )}
        </header>

        <section>
          <h2 style={styles.sectionTitle}>Posiciones Abiertas</h2>

          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobItem key={job.id} job={job} candidate={candidate} />
            ))
          ) : (
            <p>No hay posiciones disponibles en este momento.</p>
          )}
        </section>

        <footer style={styles.footer}>
          <p>© 2026 Nimble Gravity Challenge — Built by Florencia</p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #0f172a, #111827)",
    color: "#f1f5f9",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "42px",
    fontWeight: "800",
    letterSpacing: "-1px",
    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "16px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    borderBottom: "1px solid #1e293b",
    paddingBottom: "10px",
  },
  footer: {
    marginTop: "60px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  },
  centerScreen: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#f1f5f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
  },
  loader: {
    width: "40px",
    height: "40px",
    border: "4px solid #334155",
    borderTop: "4px solid #38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};



export default App;
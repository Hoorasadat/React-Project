import React, { useState, useEffect } from 'react';

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = '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';

    fetch('https://api.github.com/users/hoorasadat/repos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setRepositories(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching repositories: {error.message}</div>;
  }

  return (
    <div className="col-md mb-3">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">My GitHub Repositories</h2>
          <ul className="list-unstyled">
						{repositories.map(repo => (
						<li key={repo.id}>
							<a
								href={repo.html_url} target="_blank" rel="noopener noreferrer"
								className="fs-6 text-decoration-none"
							>
								{repo.name}
							</a>
						</li>
						))}
					</ul>
				</div>
			</div>
		</div>
  );
};

export default Repositories;
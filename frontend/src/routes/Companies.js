import React, { useEffect, useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import JoblyApi from '../api';
import '../styles/Companies.css';
import Search from '../Search';
import UserContext from '../UserContext';
import Paginator from '../Paginator';

const Companies = () => {
  const { user } = useContext(UserContext)
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedCompanies, setPaginatedCompanies] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getCompanies = async () => {
      let comps = await JoblyApi.getCompanies(user.token);
      setCompanies(companies => comps);
    }

    if (user && companies.length === 0) {
      getCompanies();
    }

  }, [user, companies]);

  if (!user) {
    return <Redirect to="/" />
  }

  const gotoCompany = (handle) => {
    history.push(`/companies/${handle}`);
  }

  if (paginatedCompanies.length === 0 || paginatedCompanies[0].length === 0) {
    return (
      <>
        <h1>Loading...</h1>
        <div hidden>
          <Paginator
            itemsToPaginate={companies}
            paginatedItems={paginatedCompanies}
            setPaginatedItems={setPaginatedCompanies}
            page={page}
            setPage={setPage} />
        </div>
      </>
    )
  }
  if (companies.length === 0) {
    return (
      <h1>No Companies Found</h1>
    )
  }

  else {
    return (
      <>
        <div className="Companies">
          <h1>Companies</h1>
          <Paginator
            itemsToPaginate={companies}
            paginatedItems={paginatedCompanies}
            setPaginatedItems={setPaginatedCompanies}
            page={page}
            setPage={setPage} />
          <Search items={companies} setItems={setCompanies} />

          {paginatedCompanies[page - 1].map(company => (
            <div key={company.handle} className="Companies-Card" onClick={() => gotoCompany(company.handle)}>
              <div className="Card-Title">
                <h1>{company.name}</h1>
                <img className="Card-Logo" src={company.logoUrl} alt={`${company.name} logo`} />
              </div>
              <div className="Card-Body">
                <p>{company.description}</p>
              </div>
            </div>
          ))}
          <Paginator
            itemsToPaginate={companies}
            paginatedItems={paginatedCompanies}
            setPaginatedItems={setPaginatedCompanies}
            page={page}
            setPage={setPage} />
        </div>
      </>
    );
  }

}

export default Companies;
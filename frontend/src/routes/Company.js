import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import JoblyApi from "../api";
import '../styles/Company.css';
import UserContext from "../UserContext";
import Job from '../Job';
import '../styles/Company.css'


const Company = () => {
  const [company, setCompany] = useState(null);
  const { user } = useContext(UserContext);

  const { handle } = useParams();

  useEffect(() => {
    const getCompany = async () => {
      let company = await JoblyApi.getCompany(handle, user.token)
      setCompany(company);
    }

    if (user && !company) {
      getCompany();
    }
  }, [user, handle, company]);

  if (!user) {
    return (
      <Redirect to="/" />
    )
  }

  if (company) {
    return (
      <div className="Company">
        <h1>{company.name}</h1>
        <p>{company.description}</p>
        <div>
          {company.jobs.map(job => <Job key={job.id} job={job} />)}
        </div>
      </div>
    );
  }
  else {
    return (
      <h1>Loading...</h1>
    )
  }

}

export default Company;
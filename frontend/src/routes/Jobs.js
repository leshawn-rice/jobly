import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import JoblyApi from '../api';
import Job from '../Job';
import UserContext from '../UserContext';
import '../styles/Jobs.css';

const Jobs = () => {
  const { user } = useContext(UserContext)
  const [jobs, setJobs] = useState([]);


  useEffect(() => {
    const getJobs = async () => {
      let jobs = await JoblyApi.getJobs(user.token);
      setJobs(jobs);
    }

    if (user && jobs.length === 0) {
      getJobs();
    }
  }, [user, jobs]);

  if (!user) {
    return <Redirect to="/" />
  }

  if (jobs.length === 0) {
    return (
      <h1>Loading...</h1>
    )
  }
  else {
    return (
      <div className="Jobs">
        <h1 className="Jobs-Title">Jobs</h1>
        {jobs.map(job => <Job key={job.id} job={job} noCompany={true} />)}
      </div>
    );
  }
}

export default Jobs;
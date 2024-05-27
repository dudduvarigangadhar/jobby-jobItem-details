import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    isJobDetails: apiConstantsStatus.initial,
    jobsDetails: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const jobsItemUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsItemUrl, options)
    const data = await response.json()
    // console.log(data)
    const updatedData = data.job_details(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      company_websites_url: eachJob.company_websites_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      lifeAtCompany: {
        description: eachJob.life_at_company.description,
        imageUrl: eachJob.life_at_company.image_url,
      },
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
    }))

    const skillsData = data.job_details.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))

    const updatedSimilarJobs = data.similar_jobs(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
  }

  renderSuccessFulJobsView = () => {}

  renderLoadingJobsView = () => {}

  renderFailureJobsView = () => {}

  render() {
    return (
      <div>
        <h1>Jobs item details</h1>
      </div>
    )
  }
}

export default JobItemDetails

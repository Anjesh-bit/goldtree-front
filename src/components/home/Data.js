const dummyDataFeatured = [
  {
    position: 'Senior level Developer',
    company: 'Google',
    location: 'USA',
    type: 'Full Time',
    salary: 'Negotiable',
  },
  {
    position: 'Data Analysts',
    company: 'Google',
    location: 'USA',
    type: 'Full Time',
    salary: 'Negotiable',
  },
  {
    position: 'React Engineer',
    company: 'Google',
    location: 'USA',
    type: 'Full Time',
    salary: 'Negotiable',
  },
  {
    position: 'Senior level Developer',
    company: 'Google',
    location: 'USA',
    type: 'Full Time',
    salary: 'Negotiable',
  },
  {
    position: 'NodeJs Developer',
    company: 'Google',
    location: 'USA',
    type: 'Full Time',
    salary: 'Negotiable',
  },
  {
    position: 'Senior level Developer',
    company: 'Google',
    location: 'USA',
    type: 'Full Time',
    salary: 'Negotiable',
  },
];

const dummyDataCompanyList = [
  {
    company: 'Google',
    description: 'Search and find your dream job is easier than before',
  },
  {
    company: 'Apple',
    description: 'Search and find your dream job is easier than before',
  },
  {
    company: 'Meta',
    description: 'Search and find your dream job is easier than before',
  },
  {
    company: 'Amazon',
    description: 'Search and find your dream job is easier than before',
  },
  {
    company: 'Google',
    description: 'Search and find your dream job is easier than before',
  },
  {
    company: 'GoldTree',
    description: 'Search and find your dream job is easier than before',
  },
];

const dashBoardData = [
  {
    key: 'employee',
    data: [
      { header: 'Posted Jobs', subHeader: 'Job Posted', key: 'postedJobs' },
      { header: 'Live Jobs', subHeader: 'Live Jobs', key: 'liveJobs' },
      {
        header: 'Admin Approved',
        subHeader: 'Approved Posts',
        key: 'adminApproved',
      },
      {
        header: 'CVs Reviewed',
        cvsData: [
          {
            cvsList: 'CVs Reviewed',
            key: 'cvsR',
          },
          {
            cvsList: 'CVs Not Reviewed',
            key: 'cvsN',
          },
        ],
        key: 'cvs',
      },
      {
        header: 'Total Applications',
        subHeader: 'Total Application',
        link: 'jobs-applied',
        key: 'totalApplication',
      },
      {
        header: 'Job Status',
        cvsData: [
          {
            status: 'Live',
            key: 'live',
          },
          {
            status: 'Closed',
            key: 'closed',
          },
          {
            status: 'Status',
            key: 'status',
          },
        ],
        key: 'jobStatus',
      },
      {
        header: 'ShortListed',
        subHeader: 'Short Listed Interview',
        link: 'short-list-candidates',
        key: 'shortListed',
      },
      {
        header: 'Pending Count',
        subHeader: 'Pending Jobs',
        key: 'pendingCount',
      },
      {
        header: 'Rejected Count',
        subHeader: 'Rejected Applications',
        key: 'rejectedCount',
      },
    ],
  },
  {
    key: 'jobSeeker',
    data: [
      {
        header: 'Application Statistics',
        subHeader: 'Applied for jobs',
        link: 'jobs-applied',
      },
      {
        header: 'Resume Circulation Statistics',
        subHeader: '0 Views by different companies',
        link: '',
      },

      { header: 'My Resume', subHeader: 'View My Resume', link: 'resume' },
      {
        header: 'Appropriate For Me',
        subHeader: '0 Hot Jobs',
        link: '',
      },
      {
        header: 'Waiting Count',
        subHeader: 'Waiting For Interview',
        link: '',
      },
      {
        header: 'My Profile',
        subHeader: 'My Profile',
        link: 'profile',
      },
      {
        header: 'Short listed',
        subHeader: 'Short listed for Interviews',
        link: 'short-listed-jobs',
      },
      {
        header: 'Pending Count',
        subHeader: 'Applications pending for companies',
        link: '',
      },
      {
        header: 'Rejected Count',
        subHeader: 'Applications rejected by companies',
        link: '',
      },
      { header: 'Live Jobs', subHeader: 'Live Job', link: '' },
    ],
  },
];

export { dummyDataFeatured, dummyDataCompanyList, dashBoardData };

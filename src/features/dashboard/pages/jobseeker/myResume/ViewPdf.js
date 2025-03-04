import { Fragment } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useGetProfileInfo } from '../../../../../services/jobSeeker/setUp';
import Loading from '../../../../../assets/svg/loading.svg';
import { isAuthenticated } from '../../../../../shared/utils/auth';

dayjs.locale('en');

const ViewPdf = () => {
  const { data: profileData, isLoading } = useGetProfileInfo(
    isAuthenticated()?.id
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <img src={Loading} />
      </div>
    );

  const [patient] = profileData ?? [];

  return (
    <div>
      <Fragment>
        {patient && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            {patient.profile && (
              <>
                <div className="col-span-6 p-2 flex flex-col gap-1">
                  <img
                    src={patient.profile_images ?? 'no-image'}
                    size={100}
                    className="h-[60px] w-[60px] object-cover mt-4"
                    alt="Profile"
                  />
                  <div className="font-medium text-[1rem]">
                    {patient.experience?.designation ?? 'N/A'}
                  </div>
                  <div>{patient.profile?.nationality ?? 'N/A'}</div>
                  <div>{patient.profile?.permanent_addr ?? 'N/A'}</div>
                  <div>
                    <i>{patient.profile?.phone_no ?? 'N/A'}</i>
                  </div>
                </div>
                <div className="col-span-6 p-2">
                  <div className="text-[2.5rem] font-bold">
                    {patient.profile?.full_name ?? 'N/A'}
                  </div>
                  <div className="rounded-xl p-2">
                    <div className="text-[1.3rem] font-medium">Profile</div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: patient.profile?.description ?? 'N/A',
                      }}
                    ></div>
                  </div>
                </div>
              </>
            )}
            {patient.experience && (
              <div className="col-span-6 h-fit p-2 flex flex-col gap-2">
                <div className="text-[2.5rem] font-bold">Experience</div>
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-[1.3rem]">
                    {patient.experience?.designation ?? 'N/A'}
                  </div>
                  <div>
                    <i>{`${dayjs(patient.experience?.from).format('DD MMM YYYY') ?? 'N/A'} - ${dayjs(patient.experience?.to).format('DD MMM YYYY') || 'N/A'}`}</i>
                  </div>

                  <div>{patient.experience?.company ?? 'N/A'}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: patient.experience?.description || 'N/A',
                    }}
                  ></div>
                </div>
              </div>
            )}
            {patient.education && (
              <div className="col-span-6 h-fit p-2 flex flex-col gap-2">
                <div className="text-[2.5rem] font-bold">Education</div>
                <div className="font-medium text-[1.3rem]">
                  {patient.education?.degree ?? 'N/A'}
                </div>
                <div>
                  <i>
                    {dayjs(patient.education?.passed_year).format(
                      'DD MMM YYYY'
                    ) ?? 'N/A'}
                  </i>
                </div>
                <div>{patient.education?.level ?? 'N/A'}</div>
              </div>
            )}
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default ViewPdf;

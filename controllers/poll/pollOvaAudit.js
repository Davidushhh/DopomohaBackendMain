const { pool } = require("../../models");

const pollOvaAudit = async (req, res, next) => {
  const {
    isWorkingWithPublicInfo = null,
    howOftenSentPublicRequest = null,
    spheresOfPublicRequests = null,
    howOftenUseWebsite = null,
    whichInfoResourcesUse = null,
    whichPublicInfoUse = null,
    whichSperesToAudit = null,
    whichDepartmentsToAudit = null,
    propositions = null,
    isPermanentLiveIn = null,
    sex = null,
    age = null,
    conatacts = null,
  } = req.body;

  if (
    !isWorkingWithPublicInfo &&
    !howOftenSentPublicRequest &&
    !spheresOfPublicRequests &&
    !howOftenUseWebsite &&
    !whichInfoResourcesUse &&
    !whichPublicInfoUse &&
    !whichSperesToAudit &&
    !whichDepartmentsToAudit &&
    !propositions &&
    !isPermanentLiveIn &&
    !sex &&
    !age &&
    !conatacts
  ) {
    return res.status(404).json({
      message: "no data provided",
      code: 404,
    });
  }

  try {
    const newDriverQuery =
      "INSERT INTO poll_ova_audit (isWorkingWithPublicInfo, howOftenSentPublicRequest, spheresOfPublicRequests, howOftenUseWebsite, whichInfoResourcesUse, whichPublicInfoUse, whichSperesToAudit, whichDepartmentsToAudit, propositions, isPermanentLiveIn, sex, age, conatacts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    pool.query(
      newDriverQuery,
      [
        isWorkingWithPublicInfo,
        howOftenSentPublicRequest,
        spheresOfPublicRequests,
        howOftenUseWebsite,
        whichInfoResourcesUse,
        whichPublicInfoUse,
        whichSperesToAudit,
        whichDepartmentsToAudit,
        propositions,
        isPermanentLiveIn,
        sex,
        age,
        conatacts,
      ],
      (err, result) => {
        if (err) {
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        return res.status(201).json({
          code: 201,
          message: "poll ova audit data added",
          data: {
            isWorkingWithPublicInfo,
            howOftenSentPublicRequest,
            spheresOfPublicRequests,
            howOftenUseWebsite,
            whichInfoResourcesUse,
            whichPublicInfoUse,
            whichSperesToAudit,
            whichDepartmentsToAudit,
            propositions,
            isPermanentLiveIn,
            sex,
            age,
            conatacts,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { pollOvaAudit };

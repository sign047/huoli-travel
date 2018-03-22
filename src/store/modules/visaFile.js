const visaFile = {
  state: {
    currentPassport: "",
    currentNumber: "",
    baseApplication: {
      basicStatus: 0,
      contactStatus: 0,
      familyStatus: 0,
      humessageStatus: 0,
      id: "",
      vfId: ""
    },
    currentFile: {
      accountBookStatus: 0,
      applicationStatus: 0,
      headStatus: 0,
      id: -1,
      idCardStatus: 0,
      marriageStatus: 0,
      propertyStatus: 0,
      step: 0,
      moveStep: 0,
      visaFileDesc: "",
      visaFileName: "",
      visaFileUserName: null
    }
  },
  getters: {},
  mutations: {
    SET_CURRENTFILE: (state, file) => {
      state.currentFile = file;
    },
    SET_BASEPPLICATION: (state, application) => {
      state.baseApplication = application;
    }
  },
  actions: {}
};
export default visaFile;

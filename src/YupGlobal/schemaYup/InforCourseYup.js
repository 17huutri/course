import yup from "../YupGlobal";

const schemaCreate = yup.object().shape({
  nameCourse: yup.string().required("required"),
  description: yup.string().required("required"),
  outCome: yup.string().required("required"),
  priceCourse: yup.number().positive().required("required"),
  imageMain: yup.string().url("Invalid URL format").required("required"),
  videoMain: yup.string().url("Invalid URL format").required("required"),
  category: yup.array().min(1).of(yup.string().required()).required(),
});

export default schemaCreate;

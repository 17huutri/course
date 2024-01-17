import yup from "../YupGlobal";

const schemaSection = yup.object().shape({
  nameSection: yup.string().required("required"),
  descriptionSec: yup.string().required("required"),
});

export default schemaSection;

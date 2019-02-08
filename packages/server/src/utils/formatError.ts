import _ from "lodash";

interface ErrorResponse {
  path: string;
  message: string;
}
export default (e: any) => {
  const result: ErrorResponse[] = [];
  Object.values(e.details).map(err => {
    const obj = _.pick(err, ["path", "message"]);
    result.push({
      // @ts-ignore
      path: obj.path[0],
      // @ts-ignore
      message: obj.message
    });
  });
  return result;
};

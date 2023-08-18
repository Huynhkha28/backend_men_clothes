
export const modelGetCategories = async (connection) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [categories_data] = await connection.query("SELECT * FROM category");
      resolve([categories_data]);
    } catch (err) {
      reject(err);
    }
  });
}

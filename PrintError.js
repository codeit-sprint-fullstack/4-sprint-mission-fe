export function PrintError(e) {
  console.log(
    `status: ${e.response.status}\nmessage: ${e.response.data.message}`
  );
}

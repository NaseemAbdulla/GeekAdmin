export async function fetchUsers(){
    const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", {
        method: "GET"
    })
    const data = await response.json();
    return data
}
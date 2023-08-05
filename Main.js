let path = './images/imagess'
const imagePaths = require('./ff')(path);
console.log("Total Images Length "+imagePaths)
let path_to_pdf = require('./image_path_to_pdf');



imagePaths.then((patharr)=>
{
    let pathpdf = "./pdf_folder";
    let path = './images/imagess';
    let temp_path = []
    for(let paths of patharr)
    {
        temp_path.push(path+"/"+paths);
    }
    executer();
    async function executer()
    {
        let limit = 30;
        let val = temp_path.length/limit;
        let loop = String(val).includes('.')?Math.trunc(val)+1:val;
        for(let i = 0 ; i <loop ; i++)
        {
            let temp_path1 = [];
            let j = i*limit;
            let jl = j+limit;
            for(j;j<jl&& j<temp_path.length;j++)
            {
                temp_path1.push(temp_path[j]);
            }
            await success_promiser(temp_path1,`${pathpdf}/${i+1}.pdf`);
            Promise.all([success_promiser]);
        }
    }
    // success_promiser(temp_path,pathpdf);
    
})


function success_promiser(temp_path,pathpdf)
{
    console.log("Entered Promise")
    console.log("Image Path ");
    console.log(temp_path);

    console.log("Pdf Paths "+pathpdf);
    return new Promise(res=>
        {
            path_to_pdf(temp_path,pathpdf,res)
        })
}

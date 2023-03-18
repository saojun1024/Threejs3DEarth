	// 定义矩阵相乘arr1,arr2，m1为第一个数组行数，m2为第二个数组行数
    function matPlus(arr1,arr2,m1,m2){
        let n1 = arr1.length / m1
        let n2 = arr2.length / m2
        let arr = []
        if(n1!==m2){
            console.log("第一个矩阵的列数应该等于第二个矩阵的行数")
            return
        } else {
            let m1Arr = new Array(m1).fill(0).map((item,index)=>{
                return arr1.slice(index*n1,(index+1)*n1)
            })

            let m2Arr = new Array(n2).fill(0).map((item,index)=>{
                return new Array(m2).fill(0).map((item2,index2)=>{
                    return arr2[index2*n2+index]
                })
            })

            function add(a1,a2){
                let n = 0
                a1.forEach((item,index)=>{
                    n+= item*a2[index]
                })
                return n
            }

            let mRow = m1
            let mCol = n2
            for(let i = 0;i<mRow;i++){
                for(let j = 0;j<mCol;j++){
                    arr.push(add(m1Arr[i],m2Arr[j]))
                }
            }
        }
        return arr
    }



    function matrixTranspose(arr,rows){
        const cols = arr.length / rows
        let newArr = new Array(rows).fill(0).map((item,index)=>{
            return arr.slice(index*cols,(index+1)*cols)
        })
        let result = []
        for(let i=0;i<cols;i++){
            for(let j=0;j<rows;j++){
                console.log(newArr[j][i])
                result.push(newArr[j][i])
            }
        }
        return result
    }


    let arr = [
        1,2,3,4,
        5,6,7,8,
        9,10,11,12
    ]

    console.log(matrixTranspose(arr,3))

    
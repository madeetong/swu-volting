import React from 'react';
import Web3 from "web3/dist/web3.min.js";
import Swal from 'sweetalert2'

export default function Home() {
    const [account,setAccount] = React.useState('')
    const [balanceETH,setBalance] = React.useState('')
    const [network,setNetwork] = React.useState('')
    const [explorerUrl,setExplorerUrl] = React.useState('')
    const [contractAddress,setContractAddress] = React.useState('')

    const [candidateArray,setCandidateArray] = React.useState([])
    const [comment,setComment] = React.useState('')

    const web3 = new Web3(window.ethereum)
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidate",
                    "type": "string"
                }
            ],
            "name": "addcandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidate",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "comment",
                    "type": "string"
                }
            ],
            "name": "commentcandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidate",
                    "type": "string"
                }
            ],
            "name": "votecandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidatelist",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "commentreceive",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "eachcomment",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "isvoted",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "returnarray",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "votereceive",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const contract = new web3.eth.Contract(abi, contractAddress)

    const startApp = async (web3)=>{
        await window.ethereum.enable()

        const netId = await web3.eth.net.getId()
        const account = await web3.eth.getAccounts()
        const balanceWei = await web3.eth.getBalance(account[0])
        const balanceETH = web3.utils.fromWei(balanceWei)

        if(netId == 5){
            console.log('network name : Goerli')
            const network = 'Goerli';
            const explorerUrl = "https://" + network.toLowerCase() + ".etherscan.io/"
            const contractAddress = '' 
            setNetwork(network)
            setExplorerUrl(explorerUrl)
            setContractAddress(contractAddress)
        }else
        if(netId == 1){
            console.log('network name : Mainnet')
            const network = 'Mainnet';
            const explorerUrl = "https://etherscan.io/"
            const contractAddress = ''
            setNetwork(network)
            setExplorerUrl(explorerUrl)
            setContractAddress(contractAddress)
        }else
        if(netId == 10){
            console.log('network name : Optimism')
            const network = 'Optimism';
            const explorerUrl = "https://optimistic.etherscan.io/"
            const contractAddress = ''
            setNetwork(network)
            setExplorerUrl(explorerUrl)
            setContractAddress(contractAddress)
        }else
        if(netId == 137){
            console.log('network name : Polygon')
            const network = 'Polygon';
            const explorerUrl = "https://polygonscan.com/"
            const contractAddress = ''
            setNetwork(network)
            setExplorerUrl(explorerUrl)
            setContractAddress(contractAddress)
        }else
        if(netId == 56){
            console.log('network name : Binance Smart Chain')
            const network = 'Binance Smart Chain';
            const explorerUrl = "https://bscscan.com/"
            const contractAddress = ''
            setNetwork(network)
            setExplorerUrl(explorerUrl)
            setContractAddress(contractAddress)
        }else
        if(netId == 97){
            console.log('network name : BSC Testnet')
            const network = 'BSC Testnet';
            const explorerUrl = "https://testnet.bscscan.com/"
            const contractAddress = '0x41c387162aa9ae67D22D8e2E3b95DC5f75525Cb0'
            setNetwork(network)
            setExplorerUrl(explorerUrl)
            setContractAddress(contractAddress)
        }else {
            console.log('network name : Unknown')
            const network = 'Unknown Network';
            const warning = 'we only support on network BSC Testnet ';
        }

        setAccount(account)
        setBalance(balanceETH)
    }

    React.useEffect(()=>{
        startApp(web3)
    },[])
    React.useEffect(()=>{
        returnArray()
    },[contractAddress])

    const returnArray = async()=>{
        const result = await contract.methods.returnarray().call()
        const arr = []
        console.log(result)
        for(let i=0;i<result.length;i++){
            arr.push({
                name:result[i],
                voteReceive: await contract.methods.votereceive(result[i]).call()
            })
        }
        console.log('arr :',arr)
        setCandidateArray(await Promise.all(arr))

    }

    const votecandidate = async(cadidateName) =>{
        const result = await contract.methods.votecandidate(cadidateName).send({
            from: account[0],
        })
        await Swal.fire(
            'Done!',
            'Check your Transaction : '+explorerUrl+'tx/'+result.transactionHash,
            'success'
          ).then(()=>{returnArray()})
    }

    const commentcandidate = async(cadidateName,comment) =>{
        const result = await contract.methods.commentcandidate(cadidateName,comment).send({
            from: account[0],
        })
        await Swal.fire(
            'Done!',
            'Check your Transaction : '+explorerUrl+'tx/'+result.transactionHash,
            'success'
          ).then(()=>{window.location.reload()})
    }

  return (
    <div>
        <div className='w-100 bg-red-500 text-white shadow rounded container mx-auto p-3 my-5 flex justify-center items-center text-xl flex-col rounded-lg'>
            <h1>SWU ANNONYMOUS VOLTING</h1>
            <p className='text-xs'>power by Binance Smart Chain testnet</p>
        </div>

        <div className='mx-auto bg-gray-100 p-3 container flex text-xl flex-col rounded-lg text-sm font-medium text-gray-900 dark:text-white'>
            <p>Network Name : <i style={{fontWeight:'700',color:'red'}}>{network}</i></p>
            <p>Address : <i style={{fontWeight:'700',color:'red'}}>{account[0]}</i></p>
            <p>Balance : <i style={{fontWeight:'700',color:'red'}}>{balanceETH}</i> BNB</p>
            <p>Explorer : <a href={explorerUrl} style={{fontWeight:'700',color:'red'}}> {explorerUrl}</a></p>
            <p>Contract : <i style={{fontWeight:'700',color:'red'}}>{contractAddress}</i></p>
        </div>

        <div className='my-2 mx-auto p-3 container flex flex-wrap text-xl flex-row rounded-lg justify-center	'>
            {candidateArray.map((item,index)=>(
                <div key={index} className='m-3 bg-gray-100 p-5 flex text-xl flex-col rounded-lg w-80'>
                    <div style={{fontWeight:700, fontSize:'30px',marginBottom:'10px'}}>{item.name}</div>
                    <div className="block my-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Score : {item.voteReceive}</div>
                    <div><button className='text-white my-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br 
                    focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg 
                    dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={()=>{votecandidate(item.name)}}>Vote</button></div>
                    <hr className='my-3'></hr>
                    <label for="message" className="block my-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e)=>setComment(e.target.value)}></textarea>
                    <button className='text-white my-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br 
                    focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg 
                    dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={()=>{commentcandidate(item.name,comment)}}>Summit</button>

                    
                </div>
            ))}
        </div>

        <div>
            
        </div>

    </div>
  )
}

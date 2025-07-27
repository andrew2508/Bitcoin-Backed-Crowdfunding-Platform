import React, { useState, useEffect } from 'react';
import { connectWebSocketClient } from '@stacks/blockchain-api-client';
import { StacksTestnet } from '@stacks/network';
import { AppConfig, UserSession } from '@stacks/connect';
import './App.css';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
const network = new StacksTestnet();

function App() {
  const [userData, setUserData] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Contract details
  const contractAddress = 'YOUR_CONTRACT_ADDRESS';
  const contractName = 'YOUR_CONTRACT_NAME';

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      fetchContractData();
    }
  }, []);

  const fetchContractData = async () => {
    try {
      const client = await connectWebSocketClient('https://stacks-node-api.testnet.stacks.co/');
      
      const response = await client.callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-status',
        functionArgs: [],
        senderAddress: userData?.profile?.stxAddress?.testnet || '',
      });
      
      setContractData(response.result.value);
    } catch (err) {
      console.error('Error fetching contract data:', err);
      setError('Failed to load contract data');
    }
  };

  const handleAuth = () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut();
      setUserData(null);
    } else {
      userSession.redirectToSignIn();
    }
  };

  const callContractFunction = async (functionName, args = [], postConditions = []) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const options = {
        contractAddress,
        contractName,
        functionName,
        functionArgs: args,
        network,
        postConditions,
        onFinish: (data) => {
          setSuccess(`Transaction submitted: ${data.txId}`);
          setTimeout(fetchContractData, 5000); // Refresh data after 5 seconds
        },
        onCancel: () => {
          setError('Transaction cancelled');
        },
      };

      await window.StacksConnect.signContractCall(options);
    } catch (err) {
      console.error(`Error calling ${functionName}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePledge = async () => {
    const microStx = parseInt(amount) * 1000000;
    if (isNaN(microStx) || microStx <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    await callContractFunction('pledge', [{
      type: 'uint',
      value: microStx.toString(),
    }]);
  };

  const handleRefund = async () => {
    await callContractFunction('refund');
  };

  const handleClaim = async () => {
    await callContractFunction('claim-funds');
  };

  const handleCancel = async () => {
    await callContractFunction('cancel-campaign');
  };

  const formatSTX = (microStx) => {
    return microStx ? (microStx / 1000000).toLocaleString() : '0';
  };

  const formatDeadline = (blockHeight) => {
    return blockHeight ? `Block #${blockHeight}` : 'Not set';
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Crowdfunding Platform</h1>
        <button onClick={handleAuth} className="connect-button">
          {userSession.isUserSignedIn() ? 'Disconnect Wallet' : 'Connect Wallet'}
        </button>
      </header>

      {userSession.isUserSignedIn() && (
        <div className="user-info">
          <p>Connected as: {userData?.profile?.stxAddress?.testnet}</p>
        </div>
      )}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="contract-info">
        {contractData ? (
          <>
            <div className="info-card">
              <h3>Campaign Status</h3>
              <p>Goal: {formatSTX(contractData['funding-goal'].value)} STX</p>
              <p>Pledged: {formatSTX(contractData['total-pledged'].value)} STX</p>
              <p>Deadline: {formatDeadline(contractData['deadline'].value)}</p>
              <p>Status: {contractData['funding-successful'].value ? '✅ Goal Reached' : '🚧 In Progress'}</p>
            </div>

            <div className="action-card">
              <h3>Pledge to Campaign</h3>
              <div className="input-group">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount in STX"
                />
                <button onClick={handlePledge} disabled={loading}>
                  {loading ? 'Processing...' : 'Pledge'}
                </button>
              </div>
            </div>

            <div className="action-card">
              <h3>Project Owner Actions</h3>
              <div className="button-group">
                <button onClick={handleClaim} disabled={loading || !contractData['funding-successful'].value}>
                  {loading ? 'Processing...' : 'Claim Funds'}
                </button>
                <button onClick={handleCancel} disabled={loading || contractData['funding-successful'].value}>
                  {loading ? 'Processing...' : 'Cancel Campaign'}
                </button>
              </div>
            </div>

            <div className="action-card">
              <h3>Backer Actions</h3>
              <button 
                onClick={handleRefund} 
                disabled={loading || 
                  contractData['funding-successful'].value || 
                  blockHeight < contractData['deadline'].value
                }
              >
                {loading ? 'Processing...' : 'Request Refund'}
              </button>
            </div>
          </>
        ) : (
          <p>Loading contract data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
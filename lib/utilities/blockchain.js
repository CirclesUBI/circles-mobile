// var express = require('express')
// var bodyParser = require('body-parser')
// var app = express()
//
// var state = {}
// var transactionState = {}

var Web3 = require('web3')
// var ethUtil = require('ethereumjs-util')
// var ethTx = require('ethereumjs-tx')

// var web3 = new Web3()
var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

var circlesHubABI = [
  {
    'constant': false,
    'inputs': [],
    'name': 'time',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address'
      },
      {
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'edges',
    'outputs': [
      { 'name': 'limit',
        'type': 'uint256'
      },
      { 'name': 'value',
        'type': 'uint256'
      },
      {
        'name': 'lastTouched',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'register',
    'outputs': [],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'userToToken',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      { 'name': 'nodes',
        'type': 'address[]'
      },
      { 'name': 'tokens',
        'type': 'address[]'
      },
      { 'name': 'wad',
        'type': 'uint256'
      }
    ],
    'name': 'transferThrough',
    'outputs': [],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'tokenToUser',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'type': 'function'},
  {
    'constant': false,
    'inputs': [],
    'name': 'join',
    'outputs': [],
    'payable': false,
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'node',
        'type': 'address'
      },
      {
        'name': 'yes',
        'type': 'bool'
      },
      {
        'name': 'limit',
        'type': 'uint256'
      }
    ],
    'name': 'trust',
    'outputs': [],
    'payable': false,
    'type': 'function'
  }
]
var circlesHubContractAddress = '0x2793a05eb841d3d8c1d5e2bd221f6567f659601f'

export var circlesHubContract = ETHEREUM_CLIENT.eth.contract(circlesHubABI).at(circlesHubContractAddress)

// circlesHubContract.join({from: ETHEREUM_CLIENT.eth.accounts[0]})

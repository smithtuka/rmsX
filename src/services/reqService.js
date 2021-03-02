import _ from 'lodash';
const requisitions = [
    {
      "id": 38,
      "name":"ROM",
      "requiredDate": "2021-02-24T02:42:44.649+00:00",
      "requester": {
        "firstName": "Smith",
        "lastName": "TUKA",
        "address": null,
        "id": 1,
        "phone": null,
        "email": "smithtuka@gmail.com",
        "role": "ADMIN"
      },
      "stage": null,
      "items": [],
      "approvalStatus": "REJECTED"
    },
    {
      "id": 412,
      "name":"ROM",
      "requiredDate": null,
      "requester": {
        "firstName": "Smith",
        "lastName": "TUKA",
        "address": null,
        "id": 1,
        "phone": null,
        "email": "smithtuka@gmail.com",
        "role": "ADMIN"
      },
      "stage": null,
      "items": [
        {
          "id": 6,
          "description": "AMPLIFIED BIBLE",
          "quantity": 400,
          "price": 9800,
          "requisition": 4
        },
        {
          "id": 5,
          "description": "NKJV BIBLE",
          "quantity": 300,
          "price": 8800,
          "requisition": 4
        },
        {
          "id": 4,
          "description": "MESSAGE BIBLE V1",
          "quantity": 200,
          "price": 7800,
          "requisition": 4
        }
      ],
      "approvalStatus": "APPROVED"
    },
    {
      "id": 18,
      "name":"ROM",
      "requiredDate": "2021-02-24T02:42:44.649+00:00",
      "requester": {
        "firstName": "Smith",
        "lastName": "TUKA",
        "address": null,
        "id": 1,
        "phone": null,
        "email": "smithtuka@gmail.com",
        "role": "ADMIN"
      },
      "stage": {"name":"Foundation", "project":{"name":"ROM Washington"}},
      "items": [
        {
          "id": 2,
          "description": "Sand",
          "quantity": 5,
          "price": 1650000,
          "requisition": 1
        },
        {
          "id": 1,
          "description": "Cement",
          "quantity": 100,
          "price": 2800,
          "requisition": 1
        }
      ],
      "approvalStatus": "REJECTED"
    },
    {
      "id": 5,
      "name":"ROM",
      "requiredDate": null,
      "requester": {
        "firstName": "Smith",
        "lastName": "TUKA",
        "address": null,
        "id": 1,
        "phone": null,
        "email": "smithtuka@gmail.com",
        "role": "ADMIN"
      },
      "stage": null,
      "items": [
        {
          "id": 9,
          "description": "AMPLIFIED BIBLE",
          "quantity": 400,
          "price": 9800,
          "requisition": 5
        },
        {
          "id": 8,
          "description": "NKJV BIBLE",
          "quantity": 300,
          "price": 8800,
          "requisition": 5
        },
        {
          "id": 7,
          "description": "MESSAGE BIBLE V1",
          "quantity": 200,
          "price": 7800,
          "requisition": 5
        },
        {
          "id": 10,
          "description": "HYMN BOOK",
          "quantity": 900,
          "price": 2700,
          "requisition": 5
        }
      ],
      "approvalStatus": "PARTIAL"
    },
    {
      "id": 6,
      "name":"ROM3",
      "requiredDate": null,
      "requester": {
        "firstName": "Smith",
        "lastName": "TUKA",
        "address": null,
        "id": 1,
        "phone": null,
        "email": "smithtuka@gmail.com",
        "role": "ADMIN"
      },
      "stage": null,
      "items": [
        {
          "id": 13,
          "description": "AMPLIFIED BIBLE",
          "quantity": 400,
          "price": 9800,
          "requisition": 6
        },
        {
          "id": 12,
          "description": "NKJV BIBLE",
          "quantity": 300,
          "price": 8800,
          "requisition": 6
        },
        {
          "id": 11,
          "description": "MESSAGE BIBLE V1",
          "quantity": 200,
          "price": 7800,
          "requisition": 6
        }
      ],
      "approvalStatus": "REJECTED"
    },
    {
      "id": 2,
      "name":"ROM5",
      "requiredDate": "2021-02-24T02:42:44.649+00:00",
      "requester": {
        "firstName": "Smith",
        "lastName": "TUKA",
        "address": null,
        "id": 1,
        "phone": null,
        "email": "smithtuka@gmail.com",
        "role": "ADMIN"
      },
      "stage": null,
      "items": [
        {
          "id": 3,
          "description": "Plascon Paint",
          "quantity": 1420,
          "price": 405000,
          "requisition": 2
        },
        {
          "id": 9,
          "description": "ABC Tiles",
          "quantity": 10,
          "price": 30,
          "requisition": 2
        }
      ],
      "approvalStatus": "REJECTED"
    }
  ]

  export function getRequisitions(){
      return requisitions;
  };

export function getRequisition(id) {
  return requisitions.find(r => r.id===id);
}

export function saveRequisition(id) {
  // return this.requisitions.find(r => r.id === id);
}

export function deleteRequisition(id) {
  let requisitionInDb = requisitions.find(r => r.id === id);
  requisitions.splice(requisitions.indexOf(requisitionInDb), 1);
  return requisitionInDb;
}

export function getItems(id){
  return _.filter(requisitions, ['id'===id]).items; 
  // null!== id ? this.requisitions.find(r => r.id===id).items: 
}

export function getProjectModel(){
  return _.map(requisitions, requisition => _.pick(requisition, ['id', 'name']));
}

export function getStageModel(){
  const stages = [];//_.flatMap(requisitions, r => {r, ['stages']}  );
  console.log(stages)
  return _.map(stages, stage => _.pick(stage, ['id', 'name']));
}
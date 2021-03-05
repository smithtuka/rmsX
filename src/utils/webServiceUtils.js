import * as RestfulQueryConstants from '../constants/restfulQueryConstants';
import axios from 'axios';

export default class WebServiceUtils {

    // static fetchAppointments = async (params, {headers, thdSsoCookie}) => {
    //     return axios.get(RestfulQueryConstants.FETCH_APPOINTMENTS, {
    //         params: params,
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     }).then((response) => {
    //         const appointmentTableData = response.data;
    //         appointmentTableData.appointments.forEach(appointment => {
    //             if (appointment.createdDate) {
    //                 appointment.createdDate = new Date(appointment.createdDate).toLocaleString();
    //             }
    //         });
    //         return response.data;
    //     }).catch((error) => {
    //         console.error("Error in WebServiceUtils while calling Distribution Orders webservice:", error.error );
    //         return Promise.reject(error);
    //     });
    // };

    // static fetchUploadHistory = async (params, {headers, thdSsoCookie}) => {
    //     return axios.get(RestfulQueryConstants.FETCH_UPLOAD_HISTORY, {
    //         params: params,
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         },
    //     }).then((response) => {
    //         const uploadTableData = response.data;
    //         uploadTableData.forEach(upload => {
    //             if (upload.created_dttm) {
    //                 upload.created_dttm = new Date(upload.created_dttm).toLocaleString();
    //             }
    //         });
    //         return response.data;
    //     }).catch((error) => {
    //         console.error("Error in WebServiceUtils while calling Appt webservice for mass Uploads:", error);
    //         return Promise.reject(error);
    //     });
    // }

    // static fetchUploadDetails = async (params, {headers, thdSsoCookie}) => {
    //     return axios.get(RestfulQueryConstants.FETCH_UPLOAD_DETAILS, {
    //         params: params,
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         },
    //         responseType: 'blob'
    //     });
    // }

    // static fetchDistributionOrders = async (params, { headers, thdSsoCookie }) => {

    //     const purchaseOrder = params.purchaseOrder;

    //     if(purchaseOrder !== undefined && purchaseOrder !== null && purchaseOrder.length>0){
    //         params = {...params, purchaseOrder:params.purchaseOrder};
    //     }

    //    return axios.get(RestfulQueryConstants.DO_CREATION_GET_ORDERS, {
    //         params: params,
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     }).then((response) => {
    //         return response.data;
    //     }).catch((error) => {
    //         console.error("Error in WebServiceUtils while calling Distribution Orders webservice:", error);
    //         return Promise.reject(error);
    //     });
    // };

    // static fetchWeightAndVolume = async (params, { headers, thdSsoCookie}) => {
    //     return axios.get(RestfulQueryConstants.SUPPLY_CHAIN_SIZES_WEIGHT_VOLUME, {
    //         params: params,
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     }).then((response) => {
    //         return response.data;
    //     }).catch((error) => {
    //         console.error("Error querying SupplyChainSizes:", error);
    //         return Promise.reject(error);
    //     });

    // };

    // static fetchPurchaseOrders = async (params, { headers, thdSsoCookie }) => {
    //     return axios.get(RestfulQueryConstants.PO_DETAILS, {
    //         params,
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     }).then(({ data }) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error("Error in WebServiceUtils while calling Purchase Orders webservice:", error);
    //         return Promise.reject(error);
    //     });
    // };

    // static fetchSKULineItems = async (params, { headers, thdSsoCookie }) => {
    //     return axios.get(RestfulQueryConstants.SKU_LINE_ITEMS, {
    //         params,
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     }).then(({ data }) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error("Error in WebServiceUtils while calling line items webservice:", error);
    //         return Promise.reject(error);
    //     });
    // };

    // static fetchDOLineItemsAndFacilities = async (params, { thdSsoCookie }) => {
    //     return axios.get(RestfulQueryConstants.DO_LINEITEMS_FACILITIES, {
    //         params: params,
    //         timeout: 60000,
    //         headers: {
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     }).then(({ data }) => {
    //         return data;
    //     }).catch((error) => {
    //             console.error("Error in WebServiceUtils while fetching DOLineItems And Facilities : ", error);
    //             return Promise.reject(error);
    //     });
    // };

    // static fetchShipmentStatus = async (requestBody, { headers, thdSsoCookie }) => {
    //     const url = `${process.env.PUBLIC_URL}/api/secure/shipmentDetails`;

    //     return axios.post(url, requestBody, {
    //         timeout: 60000,
    //         headers: {
    //             ...headers,
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     }).then(({ data }) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error("Error in WebServiceUtils while calling shipment details webservice:", error);
    //         return Promise.reject(error);
    //     });
    // };

    // static processRoutingRequest = async (requestBody, {headers, thdSsoCookie}) => {
    //     return axios
    //         .post(RestfulQueryConstants.ROUTING_REQUEST, requestBody, {
    //             timeout: 60000,
    //             headers: {
    //                 ...headers,
    //                 Authorization: 'Bearer ' + thdSsoCookie
    //             }
    //         })
    //         .then(response => {
    //             return response;
    //         })
    //         .catch(err => {
    //             console.error({err});
    //             return Promise.reject(err);
    //         });
    // };

    // static createAggregateRFRs = async (requestBody, {headers, thdSsoCookie}) => {
    //     return axios
    //         .post(RestfulQueryConstants.AGGREGATE_ROUTING_REQUEST, requestBody, {
    //             timeout: 60000,
    //             headers: {
    //                 ...headers,
    //                 Authorization: 'Bearer ' + thdSsoCookie
    //             }
    //         })
    //         .then(response => {
    //             return response;
    //         })
    //         .catch(err => {
    //             console.error({err});
    //             return Promise.reject(err);
    //         });
    // };


    // static fetchShipmentRequestTemplate = async () => {
    //     const options = {
    //         url: RestfulQueryConstants.MASS_UPLOAD_TEMPLATE,
    //         method: 'GET',
    //         responseType: 'blob',
    //         headers: {
    //             'Content-Disposition': 'attachment'
    //         }
    //     };
    //     return axios(options);
    // };

    // static fetchShipmentRequestTemplateWithSkus = async () => {
    //     const options = {
    //         url: RestfulQueryConstants.MASS_UPLOAD_TEMPLATE_WITH_SKUS,
    //         method: 'GET',
    //         responseType: 'blob',
    //         headers: {
    //             'Content-Disposition': 'attachment'
    //         }
    //     };
    //     return axios(options);
    // };

    // static postShipmentRequestMassUpload = async (requestParams, {thdSsoCookie}) => {
    //     const {
    //         massUploadFile,
    //         pvendor,
    //         isAllowedAllDates,
    //         isSelectBusinessPartner
    //     } = requestParams;

    //     const formData = new FormData();
    //     formData.append('file', massUploadFile);
    //     formData.append('businessPartnerId', pvendor);
    //     formData.append('createdSource', 'Vendor PlanEx');
    //     formData.append('isAllowedAllDates', isAllowedAllDates.toString());
    //     formData.append('isSelectBusinessPartner', isSelectBusinessPartner.toString());

    //     return axios
    //         .post(RestfulQueryConstants.MASS_UPLOAD_SENDFILE, formData, {
    //             timeout: 120000,
    //             responseType: 'blob',
    //             headers: {Authorization: 'Bearer ' + thdSsoCookie}
    //         });
    // };

    // static postAsyncShipmentRequestMassUploadWithSkus = async (requestParams, {thdSsoCookie}) => {
    //     const {
    //         massUploadFile,
    //         pvendor
    //     } = requestParams;

    //     const formData = new FormData();
    //     formData.append('file', massUploadFile);
    //     formData.append('businessPartnerId', pvendor);

    //     return axios
    //         .post(RestfulQueryConstants.ASYNC_MASS_UPLOAD_SENDFILE_WITH_SKUS, formData, {
    //             headers: {Authorization: 'Bearer ' + thdSsoCookie}
    //         });
    // };

    // static fetchPickupLocations = async (businessPartnerId='', options, includeDockHours='true') => {
    //     return WebServiceUtils.fetchLocations(businessPartnerId, '',RestfulQueryConstants.PICKUP_LOCATIONS, options, includeDockHours);
    // };

    // static fetchDeliveryLocations = async (facilityType, options, includeDockHours='true') => {
    //     return WebServiceUtils.fetchLocations('', facilityType, RestfulQueryConstants.DELIVERY_LOCATIONS, options, includeDockHours);
    // };

    // static fetchLocations = async (businessPartnerId, facilityType, url, {thdSsoCookie}, includeDockHours) => {
    //     const options = {
    //         params: {
    //             businessPartnerId,
    //             facilityType,
    //             includeDockHours
    //         },
    //         timeout: 30000,
    //         headers: {
    //             Authorization: 'Bearer ' + thdSsoCookie
    //         }
    //     };
    //     return axios
    //         .get(url, options)
    //         .then((response={}) => {
    //             const result = response.data.locations || [];
    //             return result
    //                 .sort((a, b) =>
    //                     a.facilityAliasId < b.facilityAliasId ? -1 : 1
    //                 );
    //         });
    // };

    // static fetchMVendors = async (businessPartnerId, {thdSsoCookie}) => {
    //     const url = RestfulQueryConstants.MVENDORS;
    //     const options = {
    //         params: {
    //             businessPartnerId
    //         },
    //         timeout: 30000,
    //         headers: {
    //             Authorization: `Bearer ${thdSsoCookie}`
    //         }
    //     };
    //     return axios
    //         .get(url, options)
    //         .then((response = {}) => response.data);
    // };

    // static createShipmentWithSKUs = async (request, {thdSsoCookie}) => {
    //     const url = RestfulQueryConstants.CREATE_SHIPMENT;
    //     const options = {
    //         timeout: 30000,
    //         headers: {
    //             Authorization: `Bearer ${thdSsoCookie}`
    //         }
    //     };
    //     return axios
    //         .post(url, request, options);
    // };

    // static fetchEstimatedDeliveryDate = async (params, {thdSsoCookie}) => {
    //     const {
    //         pickupDate, originFacility, destinationFacility, originFacilityStartDockHours, originFacilityEndDockHours, loadTimeInMinutes
    //     } = params;
    //     const query = {
    //         pickupDate,
    //         originFacility,
    //         destinationFacility,
    //         originFacilityStartDockHours,
    //         originFacilityEndDockHours,
    //         loadTimeInMinutes
    //     };
    //     const url = RestfulQueryConstants.FETCH_ESTIMATED_DELIVERY_DATE;
    //     const options = {
    //         timeout: 30000,
    //         headers: {
    //             Authorization: `Bearer ${thdSsoCookie}`
    //         },
    //         params: query
    //     };
    //     return axios
    //         .get(url, options)
    //         .then((response = {}) => response.data);
    // }

    static fetchRequisition = async (id) => {
        const url = `${RestfulQueryConstants.FETCH_REQUISITION_BY_ID}/${id}`;
        const options = {
            timeout: 5000
        };
        return axios
            .get(url, options)
            .then((response = {}) => response.data)
                         .catch(err => {
                            console.error({err});
                            return Promise.reject(err);
                        });
    }

}

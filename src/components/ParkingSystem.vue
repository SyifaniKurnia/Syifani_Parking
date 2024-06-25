<template>
  <div class="container py-5 h-100 w-50">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card" style="border-radius: 0.75rem; background-color: #eff1f2">
          <div class="card-body py-4 px-4 px-md-5">
            <SlotCom>
              <template #title>
                <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <u>Parking System</u>
                </p>
              </template>
            </SlotCom>

            <div class="card mb-3">
              <div class="card-body">
                <div class="d-flex flex-row align-items-center">
                  <input
                    v-model="newVehicleDaerah"
                    type="text"
                    class="w-25 form-control-lg"
                    id="inputDaerah"
                    placeholder="XX"
                    maxlength="2"
                    style="margin-right: 5px"
                  />
                  <input
                    v-model="newVehicleNumber"
                    type="text"
                    class="w-25 form-control-lg"
                    id="inputNumber"
                    placeholder="XXXX"
                    maxlength="4"
                    style="margin-right: 5px"
                  />
                  <input
                    v-model="newVehicleSubDaerah"
                    type="text"
                    class="w-25 form-control-lg"
                    id="inputSubDaerah"
                    placeholder="XXX"
                    maxlength="3"
                    style="margin-right: 5px"
                  />
                  <select
                    v-model="newVehicleType"
                    class="form-control-lg w-75"
                    style="margin-right: 5px"
                  >
                    <option value="" disabled>Select vehicle type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                  <div>
                    <button
                      @click.prevent="addVehicle"
                      type="button"
                      class="btn btn-primary"
                    >
                      Park
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center pt-2 pb-3">
              <p class="small mb-0 me-2 text-muted">Available Slots</p>
              <p class="small mb-0 text-muted">Cars: {{ carSlots }} / 60</p>
              <p class="small mb-0 text-muted">
                Motorcycles: {{ motorcycleSlots }} / 20
              </p>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Vehicle Number</th>
                  <th scope="col">Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(vehicle, index) in vehicles" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td v-if="editIndex === index">
                    <input
                      v-model="editVehicleDaerah"
                      type="text"
                      class="form-control-sm w-25"
                      maxlength="2"
                      style="margin-right: 5px"
                    />
                    <input
                      v-model="editVehicleNumber"
                      type="text"
                      class="form-control-sm w-25"
                      maxlength="4"
                      style="margin-right: 5px"
                    />
                    <input
                      v-model="editVehicleSubDaerah"
                      type="text"
                      class="form-control-sm w-25"
                      maxlength="3"
                      style="margin-right: 5px"
                    />
                  </td>
                  <td v-else>{{ vehicle.number }}</td>
                  <td v-if="editIndex === index">
                    <select
                      v-model="editVehicleType"
                      class="form-control-sm w-200"
                      style="margin-right: 5px"
                    >
                      <option value="car">Car</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                  </td>
                  <td v-else>
                    {{ vehicle.type === "car" ? "Car" : "Motorcycle" }}
                  </td>
                  <td>
                    <button
                      v-if="editIndex === index"
                      @click="updateVehicle(index)"
                      class="btn btn-success btn-sm"
                    >
                      Save
                    </button>
                    <button
                      v-else
                      @click="editVehicle(index, vehicle)"
                      class="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      v-if="editIndex !== index"
                      @click="removeVehicle(index)"
                      class="btn btn-danger btn-sm"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SlotCom from '../components/SlotCom.vue';

const newVehicleDaerah = ref('');
const newVehicleNumber = ref('');
const newVehicleSubDaerah = ref('');
const newVehicleType = ref('');
const vehicles = ref([]);
const carSlots = ref(60);
const motorcycleSlots = ref(20);
const editIndex = ref(null);
const editVehicleDaerah = ref('');
const editVehicleNumber = ref('');
const editVehicleSubDaerah = ref('');
const editVehicleType = ref('');

const addVehicle = () => {
  const completeNumber = `${newVehicleDaerah.value.trim()} ${newVehicleNumber.value.trim()} ${newVehicleSubDaerah.value.trim()}`;
  if (completeNumber.trim() !== '' && newVehicleType.value !== '') {
    const newVehicle = {
      number: completeNumber,
      type: newVehicleType.value
    };
    if (newVehicle.type === 'car' && carSlots.value > 0) {
      vehicles.value.push(newVehicle);
      carSlots.value--;
    } else if (newVehicle.type === 'motorcycle' && motorcycleSlots.value > 0) {
      vehicles.value.push(newVehicle);
      motorcycleSlots.value--;
    } else {
      alert('No available slots for the selected vehicle type');
    }
    newVehicleDaerah.value = '';
    newVehicleNumber.value = '';
    newVehicleSubDaerah.value = '';
    newVehicleType.value = '';
  }
};

const editVehicle = (index, vehicle) => {
  editIndex.value = index;
  editVehicleDaerah.value = vehicle.number.split(' ')[0];
  editVehicleNumber.value = vehicle.number.split(' ')[1];
  editVehicleSubDaerah.value = vehicle.number.split(' ')[2];
  editVehicleType.value = vehicle.type;
};

const updateVehicle = (index) => {
  const completeNumber = `${editVehicleDaerah.value.trim()} ${editVehicleNumber.value.trim()} ${editVehicleSubDaerah.value.trim()}`;
  if (completeNumber.trim() !== '' && editVehicleType.value !== '') {
    const previousType = vehicles.value[index].type;
    const newType = editVehicleType.value;

    if (newType === 'car' && carSlots.value > 0) {
      if (previousType === 'motorcycle') {
        motorcycleSlots.value++;
        carSlots.value--;
      }
      vehicles.value[index].type = newType;
    } else if (newType === 'motorcycle' && motorcycleSlots.value > 0) {
      if (previousType === 'car') {
        carSlots.value++;
        motorcycleSlots.value--;
      }
      vehicles.value[index].type = newType;
    } else if (newType === previousType) {
      // Type hasn't changed, no need to update slots
    } else {
      alert('No available slots for the selected vehicle type');
      return;
    }

    vehicles.value[index].number = completeNumber;
    editIndex.value = null;
  }
};

const removeVehicle = (index) => {
  const vehicle = vehicles.value[index];
  if (vehicle.type === 'car') {
    carSlots.value++;
  } else if (vehicle.type === 'motorcycle') {
    motorcycleSlots.value++;
  }
  vehicles.value.splice(index, 1);
};
</script>

<style scoped>
.container {
  margin: 7rem auto;
  opacity: 0.9;
}
.h1 .fa-parking,
.h1 u {
  color: #003c43;
  font-weight: bold;
}
.btn-primary {
  background-color: #194da6;
  padding: 15px 20px;
}
.list-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-select {
  font-size: 0.9rem;
}
.table {
  margin-top: 1rem;
}
</style>

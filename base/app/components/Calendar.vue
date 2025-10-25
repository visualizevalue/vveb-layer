<script setup lang="ts">
import { type DateValue } from '@internationalized/date'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  type CalendarRootProps,
} from 'reka-ui'

const props = defineProps<
  CalendarRootProps & {
    highlighted?: string[]
  }
>()

const date = defineModel<DateValue>()
</script>

<template>
  <CalendarRoot v-slot="{ weekDays, grid }" v-bind="props" v-model="date" class="calendar">
    <CalendarHeader class="header">
      <CalendarPrev as-child>
        <Button class="small unstyled">
          <Icon type="chevron-left" />
        </Button>
      </CalendarPrev>
      <CalendarHeading />
      <CalendarNext as-child>
        <Button class="small unstyled">
          <Icon type="chevron-right" />
        </Button>
      </CalendarNext>
    </CalendarHeader>
    <CalendarGrid v-for="month in grid" :key="month.value.toString()">
      <CalendarGridHead>
        <CalendarGridRow>
          <CalendarHeadCell v-for="day in weekDays" :key="day">{{ day }}</CalendarHeadCell>
        </CalendarGridRow>
      </CalendarGridHead>
      <CalendarGridBody>
        <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`">
          <CalendarCell
            v-for="weekDate in weekDates"
            :key="weekDate.toString()"
            :date="weekDate"
            class="cell"
          >
            <CalendarCellTrigger :day="weekDate" :month="month.value" />
            <div
              v-if="props.highlighted?.includes(weekDate.toString())"
              class="highlight"
            ></div>
          </CalendarCell>
        </CalendarGridRow>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>

<style scoped>
:deep(.cell) {
  position: relative;
}

.highlight {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-2px);
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: var(--gray-z-8);
}
</style>

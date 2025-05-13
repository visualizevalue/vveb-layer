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

const props = defineProps<CalendarRootProps>()

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
          >
            <CalendarCellTrigger :day="weekDate" :month="month.value" />
          </CalendarCell>
        </CalendarGridRow>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>

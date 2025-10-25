<template>
  <div class="playground">
    <h1>VVEB EVM Layer Playground</h1>

    <Card>
      <h2>Wallet Connection</h2>
      <Connect>
        <template #connected="{ address }">
          <p>
            Connected:
            <Account :address="address" />
          </p>
        </template>
      </Connect>
    </Card>

    <SignedIn />
  </div>
</template>

<script setup>
</script>

<style scoped>
.playground {
  max-width: 50rem;
  margin: 0 auto;
  padding: var(--spacer);
  display: grid;
  gap: var(--spacer);
}
</style>

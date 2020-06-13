CC=clang
LD=wasm-ld
CFLAGS=--target=wasm32-unknown-unknown-wasm --optimize=3 -nostdlib
LDFLAGS=--export-all --no-entry --allow-undefined

WASM2WAT=/opt/wabt/bin/wasm2wat

sources = array-methods.c memory-allocation.c
objects = $(sources:%.c=%.bc)
target = data-frame

.PHONY: all

all: $(target).wat

$(target).wat: $(target).wasm
	$(WASM2WAT) $(target).wasm -o $(target).wat

$(target).wasm: $(objects)
	$(LD) $(objects) $(LDFLAGS) -o $(target).wasm
	
%.bc: %.c
	$(CC) -c -emit-llvm $(CFLAGS) $< -o $@

clean:
	rm -f $(target).wasm
	rm -f $(target).wat
	rm -f $(objects)
